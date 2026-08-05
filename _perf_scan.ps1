$ErrorActionPreference = 'SilentlyContinue'

function ScanDir($path) {
    if (-not (Test-Path $path)) { return }
    $files = Get-ChildItem -LiteralPath $path -Recurse -File
    $count = $files.Count
    $size = ($files | Measure-Object -Property Length -Sum).Sum
    $sizeMB = [math]::Round($size / 1MB, 1)
    Write-Host ("{0,-55} files={1,8} size={2,8} MB" -f $path, $count, $sizeMB)
}

Write-Host "=== Directory inventory ==="
ScanDir "generated"
ScanDir "generated\prisma"
ScanDir "node_modules\@prisma"
ScanDir "node_modules\@prisma\client"
ScanDir "src"
ScanDir "node_modules"
ScanDir ".agents"
ScanDir ".claude"

Write-Host ""
Write-Host "=== 20 largest files in project (excluding node_modules) ==="
Get-ChildItem -LiteralPath "." -Recurse -File |
    Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\.git\\' } |
    Sort-Object Length -Descending |
    Select-Object -First 20 |
    ForEach-Object { Write-Host ("{0,10:N1} KB  {1}" -f ($_.Length/1KB), $_.FullName) }

Write-Host ""
Write-Host "=== TypeScript source file counts ==="
Get-ChildItem -LiteralPath "generated" -Recurse -File -Include *.ts,*.d.ts,*.tsx | Measure-Object | ForEach-Object { Write-Host ("generated .ts/.d.ts files: {0}" -f $_.Count) }
Get-ChildItem -LiteralPath "node_modules" -Recurse -File -Include *.ts,*.d.ts,*.tsx | Measure-Object | ForEach-Object { Write-Host ("node_modules .ts/.d.ts files: {0}" -f $_.Count) }