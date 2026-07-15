$src = ".open-next/server-functions/default/.next/server"
$dst = ".open-next/server-functions/default/server"
if (Test-Path $src) {
  Copy-Item -Recurse -Force $src $dst
  Write-Output "Copied .next/server/ to server/"
} else {
  Write-Output "Source not found: $src"
}
