// UID Bypass Processor - Thay thế Cloudflare Worker
// Xử lý request packets và modify protobuf data

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
        const { cipherHex, operation } = req.body;
        
        if (!cipherHex) {
            return res.status(400).json({
                success: false,
                error: 'Missing cipherHex parameter'
            });
        }
        
        // Log request for debugging (remove in production)
        console.log(`Processing ${operation || 'unknown'} operation`);
        
        // Convert hex to buffer
        const encryptedData = Buffer.from(cipherHex, 'hex');
        
        // Simulate protobuf modification
        // In real implementation, you would:
        // 1. Decrypt the data
        // 2. Parse protobuf
        // 3. Modify UID/device data
        // 4. Re-encrypt
        
        // For now, return modified hex (placeholder logic)
        const modifiedData = await modifyProtobuf(encryptedData);
        const modifiedHex = modifiedData.toString('hex').toLowerCase();
        
        return res.status(200).json({
            success: true,
            cipherHex: modifiedHex,
            message: 'Protobuf modified successfully'
        });
        
    } catch (error) {
        console.error('Processing error:', error);
        
        return res.status(500).json({
            success: false,
            error: 'Internal processing error',
            message: error.message
        });
    }
}

// Simulate protobuf modification
async function modifyProtobuf(data) {
    // This is a placeholder - implement actual protobuf processing
    // For security reasons, actual implementation should be more complex
    
    // Simple XOR modification as example
    const modified = Buffer.from(data);
    for (let i = 0; i < modified.length; i++) {
        modified[i] ^= 0x42; // Simple XOR with key
    }
    
    return modified;
}