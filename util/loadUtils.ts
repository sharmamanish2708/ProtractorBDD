export class loadUtils {
    
    
   static generateRandomString (x){
          var text = "";
          var possible = "abcdefghijklmnopqrstuvwxyz";
          for (var i = 0; i < x; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
        }
};


