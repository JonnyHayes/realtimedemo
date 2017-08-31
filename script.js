const app = {
  buildForm() {
    return [
      $('#name').val(),
      $('#position').val(),
      $('#office').val(),
      $('#extn').val(),
      $('#startDate')
        .val()
        .replace(new RegExp('-', 'g'), '/'),
      `$${$('#salary').val()}`
    ];
  },
  addRow(dataTable) {
    const formData = this.buildForm();
    const addedRow = dataTable.row.add(formData).draw();
    addedRow.show().draw(false);

    const addedRowNode = addedRow.node();
    console.log(addedRowNode);
    $(addedRowNode).addClass('highlight');
  },
  selectRow(dataTable) {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      dataTable.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  },
  removeRow(dataTable) {
    dataTable.row('.selected').remove().draw( false );
  },
  start() {
    const dataTable = $('#realtime').DataTable({
      data: dataSet,
      columns: [
        { title: 'Name' },
        { title: 'Position' },
        { title: 'Office' },
        { title: 'Extn.' },
        { title: 'Start date' },
        { title: 'Salary' }
      ]
    });

    $('#add').on('click', this.addRow.bind(this, dataTable));
    const self = this;
    $('#realtime tbody').on('click', 'tr', function(){
      self.selectRow.bind(this, dataTable)();
    });
    $('#remove').on('click', this.removeRow.bind(this, dataTable));
  }
};

$(document).ready(() => app.start());
