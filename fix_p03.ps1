$path = "D:\runanjian\gzkj\hubei-design-new\03_水平台\ppt\Page3.html"
$c = Get-Content $path -Encoding UTF8 -Raw
# Add ECharts CDN
$c = $c -replace '</head>', '<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script></head>'
# Replace chart header
$c = $c -replace '<div class="chart-header">.*?<div class="chart-container" id="chart1"></div>', '<div id="chart-city" style="flex:1;min-height:200px;"></div>'
# Update note
$c = $c -replace '<div class="ex-info"><strong>数据说明：</strong>[^<]+</div>', '<div class="ex-info"><strong>数据说明：</strong>达标线参考省级考核目标85%，数据源来自全省167个国控断面1-5月累计统计。</div>'
# Replace old script - find from var d=[ to </script>
$c = $c -replace '<script>[\s\S]*?var d=\[[\s\S]*?\]\);[\s\S]*?c\.innerHTML=h;[\s\S]*?</script>', ''
Set-Content $path -Value $c -Encoding UTF8
Write-Host "Stage1 done"
