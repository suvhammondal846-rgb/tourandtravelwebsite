# PowerShell Static Web Server
$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

Write-Host "Starting server on http://localhost:$port/ ..."
try {
    $listener.Start()
    Write-Host "Server is running. Open http://localhost:$port/ in your browser."
    Write-Host "Press Ctrl+C in this terminal to stop the server."
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }
        
        # Clean up path to prevent directory traversal
        $cleanedPath = $urlPath.Replace("/", "\").TrimStart('\')
        $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine((Get-Location).Path, $cleanedPath))
        
        # Verify target file is within root folder to prevent directory traversal
        if ($filePath.StartsWith((Get-Location).Path, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path $filePath -PathType Leaf)) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Set content-type header
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css" { "text/css; charset=utf-8" }
                ".js" { "application/javascript; charset=utf-8" }
                ".jpg" { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png" { "image/png" }
                ".gif" { "image/gif" }
                ".svg" { "image/svg+xml" }
                ".json" { "application/json; charset=utf-8" }
                default { "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $response.Close($bytes, $true)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.Close($errBytes, $true)
        }
    }
} catch {
    Write-Error $_
} finally {
    if ($listener) {
        $listener.Close()
    }
}
