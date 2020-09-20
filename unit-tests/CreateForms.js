function testCreateFormsJS_ok() {
    let data = {}
    data.formId = '1zy3SH3UBbzGGpmYwgskUiKGBMNP008dNcOdiaX5NeIA';
    data.destFolderId = '1siiAsoqUMjCcB7V6Nnm4KN1gFtixuMaw';
    data.separator = ', ';
    createFormsJS(data);
}

function testCreateFormsJS_no_formID() {
    let data = {}
    data.destFolderId = '1siiAsoqUMjCcB7V6Nnm4KN1gFtixuMaw';
    data.separator = ', ';
    createFormsJS(data);
}

function testCreateFormsJS_no_dest_folder() {
    let data = {}
    data.formId = '1zy3SH3UBbzGGpmYwgskUiKGBMNP008dNcOdiaX5NeIA';
    data.separator = ', ';
    createFormsJS(data);
}