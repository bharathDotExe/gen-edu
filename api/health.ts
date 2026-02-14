export const config = {
    runtime: 'nodejs',
};

export default function handler(_request: any, response: any) {
    response.status(200).json({ status: 'ok', message: 'API is working' });
}
