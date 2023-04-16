import loadjs from "loadjs";

function Script() {
  return (
    loadjs.reset(),
    loadjs("./vendors/js/vendor.bundle.base.js",{async:true}),
    loadjs("./vendors/chart.js/Chart.min.js",{async:true}),
    loadjs("./vendors/datatables.net/jquery.dataTables.js",{async:true}),
    loadjs("./vendors/datatables.net-bs4/dataTables.bootstrap4.js",{async:true}),
    loadjs("./js/dataTables.select.min.js",{async:true}),
    loadjs("./js/off-canvas.js",{async:true}),
    loadjs("./js/hoverable-collapse.js",{async:true}),
    loadjs("./js/template.js",{async:true}),
    loadjs("./js/settings.js",{async:true}),
    loadjs("./js/todolist.js",{async:true}),
    loadjs("./js/dashboard.js",{async:true}),
    loadjs("./js/Chart.roundedBarCharts.js",{async:true}),
    loadjs("./js/apexcharts.js",{async:true})
    
  )
}

export default Script
