// UID Bypass Forwarder - Thay thế Cloudflare Worker 2
// Xử lý response packets

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-cache');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
        });
    }
    
    try {
        const { cipherHex } = req.body;
        
        if (!cipherHex) {
            return res.status(400).json({
                success: false,
                error: 'Missing cipherHex parameter'
            });
        }
        
        // Log request for debugging
        console.log('Forwarding response packet');
        
        // Convert hex to buffer
        const responseData = Buffer.from(cipherHex, 'hex');
        
        // Process response data
        const processedData = await processResponse(responseData);
        const processedHex = processedData.toString('hex').toLowerCase();
        
        return res.status(200).json({
            success: true,
            cipherHex: processedHex,
            message: 'Response processed successfully'
        });
        
    } catch (error) {
        console.error('Forwarding error:', error);
        
        return res.status(500).json({
            success: false,
            error: 'Internal forwarding error',
            message: error.message
        });
    }
}

// Process response data
async function processResponse(data) {
    // This is a placeholder - implement actual response processing
    // For security, this should mirror the request processing logic
    
    // Simple reverse XOR to match request processing
    const processed = Buffer.from(data);
    for (let i = 0; i < processed.length; i++) {
        processed[i] ^= 0x42; // Same XOR key as processor
    }
    
    return processed;
}