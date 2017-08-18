
document.querySelector('input[type=button]').onlick = translate;

function translate(){
  var input = document.getElementById('input').value;
  console.log(getTags(input));
}

function getTags(input){
var tags = [],
    i = 0,
    j = 0;

  for(j=j; j<input.length; j++){
    if(input[j] == '<'){
      for(j=j+1; j<input.length; j++){
        if(input[j] == '>'){
          j++;
          tags.push(input.substring(i,j));
          i=j;
          break;
        }
      }
    }
  }
  return tags
}

function styleSuck(tags){
  var outhtml = '',
      outstyle = '';

  tags.forEach(function(str){
    getStyleAttr(str);
  });
}

function getStyleAttr(str){
  var i = str.indexOf('style='),
      j = i;
  if(i > -1){
    console.log(i);
    if(str[i+6]== "'") j = str.indexOf("'", i+7);
    else if(str[i+6] == '"') j = str.indexOf('"', i+7);
    return str.substring(i, j);
  }
  return '';
}
