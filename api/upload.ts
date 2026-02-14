export const config = {
    runtime: 'nodejs',
};

export default async function handler(request: any, response: any) {
    // Enable CORS just in case
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;

    if (!GITHUB_TOKEN) {
        console.error('SERVER CONFIG ERROR: GITHUB_TOKEN is missing');
        // Return 200 so the frontend sees the error message clearly instead of a generic 500 html page if something catches it
        return response.status(500).json({ error: 'Server configuration error: GITHUB_TOKEN is missing in Vercel settings.' });
    }

    try {
        // Dynamic import to avoid ESM/Top-level await issues during init
        const { Octokit } = await import('octokit');

        const owner = GITHUB_OWNER || 'bharathDotExe';
        const repo = GITHUB_REPO || 'gen-edu';
        const branch = 'main';

        let body = request.body;
        // Handle cases where body might be a string (rare in Vercel Node but possible)
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.error('JSON parse error:', e);
                return response.status(400).json({ error: 'Invalid JSON body' });
            }
        }

        const { fileContent, fileName, subjectId, type, folder } = body || {};

        if (!fileContent || !fileName || !subjectId || !type || !folder) {
            console.error('Missing fields in payload:', Object.keys(body || {}));
            return response.status(400).json({ error: 'Missing required fields: fileContent, fileName, subjectId, type, folder' });
        }

        const octokit = new Octokit({ auth: GITHUB_TOKEN });

        console.log(`[Upload] Starting upload: ${fileName} to ${folder}`);

        // 1. Upload PDF
        const pdfPath = `public/assignments/${folder}/${fileName}`;
        let pdfSha;
        try {
            const { data: existingFile } = await octokit.rest.repos.getContent({
                owner, repo, path: pdfPath, ref: branch,
            });
            if (!Array.isArray(existingFile)) {
                pdfSha = existingFile.sha;
            }
        } catch (e) { /* File doesn't exist, ignore */ }

        await octokit.rest.repos.createOrUpdateFileContents({
            owner, repo, path: pdfPath,
            message: `feat(upload): Add ${fileName} to ${subjectId}`,
            content: fileContent,
            branch,
            sha: pdfSha,
            committer: { name: 'Gen-Z Edu Bot', email: 'bot@gen-z-edu.com' },
            author: { name: 'Gen-Z Edu Bot', email: 'bot@gen-z-edu.com' }
        });

        console.log('[Upload] PDF uploaded successfully');

        // 2. Update assignments.json
        const jsonPath = 'src/data/assignments.json';
        const { data: jsonData } = await octokit.rest.repos.getContent({
            owner, repo, path: jsonPath, ref: branch,
        });

        if (Array.isArray(jsonData)) {
            throw new Error(' assignments.json path returned a directory, expected file');
        }

        const fileData = jsonData as any;
        if (!fileData.content) throw new Error('assignments.json has no content');

        const contentDecoded = Buffer.from(fileData.content, 'base64').toString('utf-8');
        const assignments = JSON.parse(contentDecoded);

        const subjectIndex = assignments.findIndex((s: any) => s.id === subjectId);
        if (subjectIndex === -1) {
            return response.status(404).json({ error: `Subject ID ${subjectId} not found in assignments.json` });
        }

        const fileExists = assignments[subjectIndex].files.some((f: any) => f.name === fileName);
        if (!fileExists) {
            assignments[subjectIndex].files.push({ name: fileName, type });
        }

        const newJsonContent = Buffer.from(JSON.stringify(assignments, null, 4)).toString('base64');

        await octokit.rest.repos.createOrUpdateFileContents({
            owner, repo, path: jsonPath,
            message: `feat(upload): Update assignments.json index for ${fileName}`,
            content: newJsonContent,
            branch,
            sha: jsonData.sha,
            committer: { name: 'Gen-Z Edu Bot', email: 'bot@gen-z-edu.com' },
            author: { name: 'Gen-Z Edu Bot', email: 'bot@gen-z-edu.com' }
        });

        console.log('[Upload] JSON index updated successfully');

        return response.status(200).json({ success: true, message: 'File uploaded and index updated successfully' });

    } catch (error: any) {
        console.error('Upload Process Error:', error);
        return response.status(500).json({
            error: error.message || 'Internal Server Error',
            details: error.response?.data || 'No additional details'
        });
    }
}
