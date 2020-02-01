const NUMBER_OF_SHEETS = 10;

const FREE_SPACE = 'Free Space';

function makeBingoTable( elements ) {

  let tableHTML = `<table>`;
  for ( let row = 0; row < 5; row++ ) {
    tableHTML += '<tr>';
    for ( let col = 0; col < 5; col++ ) {
      tableHTML += '<td>'
      let elementForTableData = elements[ row * col ];

      if ( row === 2 && col === 2 ) {
        elementForTableData = FREE_SPACE;
      }
      tableHTML += `${elementForTableData}</td>`;
    }
    tableHTML += '</tr>\n';
  }
  tableHTML += '</table>\n';
  return tableHTML;
}

function getBingoSheet( title, elements ) {

  return `<div class="newPage">
<h2>${title}</h2>
<div class="rightSize">
${makeBingoTable( elements )}

</div>
</div>`;
}

document.getElementById( 'create' ).addEventListener( 'click', () => {

  const elements = document.getElementById( 'bingoItems' ).value.split( /[\n,]/ );
  console.log( elements );

  if ( elements.length < 24 ) {
    return alert( 'you need 24 or more items for a bingo sheet!' );
  }

  const title = document.getElementById( 'title' ).value;
  console.log( 'title', title );

  let bingoSheets = '';
  for ( let i = 0; i < NUMBER_OF_SHEETS; i++ ) {
    bingoSheets += getBingoSheet( title, _.shuffle( elements ) );
  }

  const popup = window.open();
  if ( !popup ) {
    window.alert( 'Popup was blocked, please allow popups to launch the customized simulation.' );
  }
  else {

    const newTab = `<html lang="en"> 
<head> 
  <meta charset="utf-8"/> 
  <meta name="robots" content="none"/> 
  <link rel="stylesheet" href="print.css"> 
</head> 
<body> 
${bingoSheets}
</body> 
</html>`;


    popup.document.write( newTab );
  }
} );