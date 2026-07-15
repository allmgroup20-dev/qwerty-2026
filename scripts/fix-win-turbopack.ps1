$turbopackJs = "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/turbopack.js"
$backup = "${turbopackJs}.bak"

if (-not (Test-Path $backup)) {
    Copy-Item -Path $turbopackJs -Destination $backup
}

$content = Get-Content -Path $turbopackJs -Raw

# Fix 1: Normalize Windows backslashes in patchCode callback
$old = 'patchCode: async ({ code, tracedFiles, filePath }) => {'
$new = 'patchCode: async ({ code, tracedFiles, filePath }) => {
                tracedFiles = tracedFiles.map(f => f.replace(/\\/g, "/"));
                filePath = filePath.replace(/\\/g, "/");'
$content = $content.Replace($old, $new)

# Fix 2: also normalize in discoverExternalModuleMappings 
$old2 = 'function discoverExternalModuleMappings(filePath) {'
$new2 = 'function discoverExternalModuleMappings(filePath) {
    filePath = filePath.replace(/\\/g, "/");'
$content = $content.Replace($old2, $new2)

# Fix 3: Normalize paths in discoverBareExternalImports filter
$old3 = 'const chunkFiles = tracedFiles.filter((f) => f.includes(".next/server/chunks/"));'
$new3 = 'const chunkFiles = tracedFiles.filter((f) => f.replace(/\\/g, "/").includes(".next/server/chunks/"));'
$content = $content.Replace($old3, $new3)

# Fix 4: normalize in getInlinableChunks filter
$old4 = 'if (file.includes(".next/server/chunks/")) {'
$new4 = 'if (file.replace(/\\/g, "/").includes(".next/server/chunks/")) {'
$content = $content.Replace($old4, $new4)

# Fix 5: normalize in inlineChunksFn replace
$old5 = 'chunk.replace(/.*\/\.next\//, "")'
$new5 = 'chunk.replace(/\\/g, "/").replace(/.*\/\.next\//, "")'
$content = $content.Replace($old5, $new5)

# Fix 6: normalize in loadWasmChunkFn
$old6 = '.map((absPath) => ({ absPath, relPath: absPath.replace(/.*\/\.next\//, "") }))'
$new6 = '.map((absPath) => ({ absPath, relPath: absPath.replace(/\\/g, "/").replace(/.*\/\.next\//, "") }))'
$content = $content.Replace($old6, $new6)

# Fix 7: normalize in discoverExternalModuleMappings filePath.replace
$old7 = 'const dotNextDir = filePath.replace(/\/server\/chunks\/.*$/, "");'
$new7 = 'const dotNextDir = filePath.replace(/\/server\/chunks\/.*$/, "").replace(/\\/g, "/");'
$content = $content.Replace($old7, $new7)

Set-Content -Path $turbopackJs -Value $content -NoNewline
Write-Host "✅ Patched turbopack.js for Windows path compatibility"
