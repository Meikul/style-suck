

function translate(){
  var input = document.getElementById('input').value;
  styleSuck(getTags(input));
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

  tags.forEach(function(tag){
    var i = getStyleIndex(tag);
    if(i) outhtml += clipOut(tag, i[0], i[1]);
    else outhtml += tag;
    if(tag[1] != '/'){
      var selector = findSelector(tag, tags);
    }
    var re = new RegExp('<'+tagType+' (.+)>');
    console.log(tag.match(re));
    if(tag.match(re)) console.log(tag.match(re)[1]);
  });

  console.log(outhtml);
}

function findSelector(tag, tags){
  var id = classList = nthChild = tagType = attr = undefined;

  var idInd = tag.indexOf('id=');
  var classInd = tag.indexOf('class=');

  if(idInd>-1){
    id = '#'+clipAttr(tag, idInd);
    return id;
  }

  if(classInd>-1){
    classList = clipAttr(tag, classInd).split(' ').join('.');
  }

  // Tag Type
  tagType = tag.match(/<(\S+)\s/);
  tagType = tagType ? tagType[1] : undefined;

  // Attributes
  var re = new RegExp('<'+tagType+' (.)>');
  tag.match(re);
}

function clipOut(tag, i, j){
  return tag.substring(0, i-1) + tag.substring(j+1);
}

function clipAttr(tag, i){
  var openQuote = tag.indexOf('"', i);
  if(openQuote == -1){
    openQuote = tag.indexOf("'", i);
    closeQuote = tag.indexOf("'", openQuote+1);
  }
  else closeQuote = tag.indexOf('"', openQuote+1);
  return tag.substring(openQuote+1, closeQuote);
}

function getStyleIndex(tag){
  var i = tag.indexOf('style='),
      j = i;
  if(i > -1){
    if(tag[i+6]== "'") j = tag.indexOf("'", i+7);
    else if(tag[i+6] == '"') j = tag.indexOf('"', i+7);
    return [i, j];
  }
  return false;
}

function getStyleAttr(str){
  // (["'])(?:(?=(\\?))\2.)*?\1
  var i = str.indexOf('style='),
      j = i;
  if(i > -1){
    if(str[i+6]== "'") j = str.indexOf("'", i+7);
    else if(str[i+6] == '"') j = str.indexOf('"', i+7);
    return str.substring(i+7, j-1);
  }
  return '';
}



window.onload = function(){
  document.getElementById('submit').onclick = translate;
};
