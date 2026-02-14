import { Octokit } from 'octokit';

export const config = {
    runtime: 'nodejs',
};

// Helper to get GitHub config from environment
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'bharathDotExe';
const GITHUB_REPO = process.env.GITHUB_REPO || 'gen-edu';
const BRANCH = 'main'; // Target branch

export default async function handler(request: any, response: any) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    if (!GITHUB_TOKEN) {
        console.error('SERVER ERROR: GITHUB_TOKEN is missing');
        return response.status(500).json({ error: 'Server misconfigured: Missing GITHUB_TOKEN' });
    }

    try {
        let body;
        try {
            body = request.body;
        } catch (e) {
            console.error('Request body parsing error:', e);
            return response.status(400).json({ error: 'Invalid JSON body' });
        }

        const { fileContent, fileName, subjectId, type, folder } = body;

        if (!fileContent || !fileName || !subjectId || !type || !folder) {
            console.error('Missing fields:', { fileName, subjectId, type, folder });
            return response.status(400).json({ error: 'Missing required fields' });
        }

        console.log(`Starting upload for ${fileName} to ${subjectId}`);
        const octokit = new Octokit({ auth: GITHUB_TOKEN });


        // 1. Upload PDF to public/assignments/{folder}/{fileName}
        const pdfPath = `public/assignments/${folder}/${fileName}`;

        // Check if file exists to get SHA for update (optional, but good for idempotency)
        let pdfSha;
        try {
            const { data: existingFile } = await octokit.rest.repos.getContent({
                owner: GITHUB_OWNER,
                repo: GITHUB_REPO,
                path: pdfPath,
                ref: BRANCH,
            });
            if (!Array.isArray(existingFile)) {
                pdfSha = existingFile.sha;
            }
        } catch (e) {
            // File doesn't exist, which is fine
        }

        await octokit.rest.repos.createOrUpdateFileContents({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: pdfPath,
            message: `feat(upload): Add ${fileName} to ${subjectId}`,
            content: fileContent, // Base64 content
            branch: BRANCH,
            sha: pdfSha,
            committer: {
                name: 'Gen-Z Edu Bot',
                email: 'bot@gen-z-edu.com'
            },
            author: {
                name: 'Gen-Z Edu Bot',
                email: 'bot@gen-z-edu.com'
            }
        });

        // 2. Update src/data/assignments.json
        const jsonPath = 'src/data/assignments.json';
        const { data: jsonData } = await octokit.rest.repos.getContent({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: jsonPath,
            ref: BRANCH,
        });

        if (Array.isArray(jsonData)) {
            throw new Error('Could not retrieve assignments.json: expected file, got directory');
        }

        const fileData = jsonData as any; // Cast to any to avoid TS union type issues

        if (!fileData.content) {
            throw new Error('Could not retrieve assignments.json content');
        }

        const contentEncoded = fileData.content.replace(/\n/g, '');
        const contentDecoded = atob(contentEncoded);
        const assignments = JSON.parse(contentDecoded);

        // Find subject and add file
        const subjectIndex = assignments.findIndex((s: any) => s.id === subjectId);
        if (subjectIndex === -1) {
            return response.status(404).json({ error: 'Subject not found' });
        }

        const newFileEntry = { name: fileName, type: type };

        // Check if file already exists in JSON to avoid duplicates
        const fileExists = assignments[subjectIndex].files.some((f: any) => f.name === fileName);
        if (!fileExists) {
            assignments[subjectIndex].files.push(newFileEntry);
        } else {
            // Optionally update type if changed, or just skip
        }

        // Sort or organize if needed? For now just push.

        // Commit updated JSON
        const newJsonContent = btoa(JSON.stringify(assignments, null, 4));

        await octokit.rest.repos.createOrUpdateFileContents({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: jsonPath,
            message: `feat(upload): Update assignments.json for ${fileName}`,
            content: newJsonContent,
            branch: BRANCH,
            sha: jsonData.sha,
            committer: {
                name: 'Gen-Z Edu Bot',
                email: 'bot@gen-z-edu.com'
            },
            author: {
                name: 'Gen-Z Edu Bot',
                email: 'bot@gen-z-edu.com'
            }
        });


        return response.status(200).json({ success: true, message: 'File uploaded and index updated' });

    } catch (error: any) {
        console.error('Upload error:', error);
        return response.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
