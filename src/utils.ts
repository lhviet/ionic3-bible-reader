
export class Utils {

  constructor() {
  }

  static clearArray = theArray => theArray.splice(0, theArray.length);
  static clearObject = theObj => Object.keys(theObj).map(key => delete theObj[key]);

  static htmlDecode = (input: string): string =>
    input ? String(input).replace(/<[^>]+>/gm, '') : '';

  static toggleGroup(group: any[], element: any): void {
    const index = group.indexOf(element);
    if (index > -1) group.splice(index, 1);
    else group.push(element);
  }

  static highlight(sentence: string, matchingText: string | string[]): string {
    if (!matchingText || matchingText.length==0)
      return sentence;
    const tagOpen = '<i class="_yB06">';
    const tagClose = '</i>';
    const matchRegex = new RegExp(/<i class="_yB06">[\s\S]*?<\/i>/, 'ig');
    let result = '';
    try {
      if (Array.isArray(matchingText)) {
        // to prevent lost of cases, we should search with the longer match text first
        // i.e, search: i in ine
        // text: In an Ice inevitable cube
        matchingText.sort((a: string, b: string) => a.length - b.length).reverse();
        matchingText.map(match => {
          const re = new RegExp(match, 'ig');
          if (match.length == 0)
            return;
          if (match.indexOf('<') > -1
            || match.indexOf('>') > -1
            || match.indexOf('/') > -1
            || match.indexOf('"') > -1)
            return;
          if (result.length == 0)
            result = sentence.replace(new RegExp(match, 'ig'), tagOpen + match + tagClose);
          else {
            // try to skip replace the already highlighted text
            const indexArr = [];
            const indexes= [];
            let match: RegExpExecArray;
            while (match = matchRegex.exec(result)) {
              indexArr.push([match.index, match.index + match[0].length]);
            }
            while (match = re.exec(result)) {
              const iBegin = match.index;
              const iEnd = iBegin + match[0].length;
              let reserved = false;
              for (let i = 0; i < indexArr.length; i++) {
                const rBegin = indexArr[i][0];
                const rEnd = indexArr[i][1];
                if ((rBegin < iBegin && iBegin < rEnd) || (rBegin < iEnd && iEnd < rEnd)) {
                  reserved = true;
                  break;
                }
              }
              if (!reserved) {  // this matching is not reserved, we can highlight
                indexes.push([match.index, match[0].length]);
              }
            }
            let plusLength = 0;
            for (let k = 0; k < indexes.length; k++){
              const index = indexes[k][0] + plusLength;
              const matchStr = result.substr(index, indexes[k][1]);
              const replacedStr = tagOpen + matchStr + tagClose;
              result = Utils.replaceAtIndex(result, index, matchStr, replacedStr);
              plusLength += 21;  // length of <i class='_yB06'></i>
            }
            // result = result.replace(new RegExp(match, 'ig'), tagOpen + match + tagClose);
          }
        });
      }
      else {
        result = sentence.replace(new RegExp(matchingText, 'ig'), tagOpen + matchingText + tagClose);
      }
    }
    catch (ex) {
      console.error('ERROR Highlight text', ex);
    }
    return result;
  }

  static replaceAtIndex(originalStr: string, index: number, match: string, replace: string): string {
    const firstPart = originalStr.slice(0, index);
    const newPart = originalStr.slice(index).replace(match, replace);
    return firstPart + newPart;
  }
}
