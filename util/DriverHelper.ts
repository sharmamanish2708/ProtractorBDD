import {ElementFinder,element,by,browser,protractor} from "protractor";
import { homePage } from "../pages/homePage";
import {login} from "../pages/login";
var json=require('../testdata/prop.json');

export class DriverHelper {
    
    
    unameTextBox:ElementFinder;
    passTextBox:ElementFinder;
    loginButton:ElementFinder;
        
        
       
          
           clearAndFill (element, value) :void{
              element.clear()
              element.sendKeys(value)
          
      };
      
      
      selectValueFromDropDown(optionVal):void{
          
          element.all(by.tagName("option")).each(function(item)
                     {
                      item.getText().then(function(value)
                              {
                            if(value==optionVal)
                                {
                                item.click()
                                
                                }
                              })
                     })   
   }
      waitForElementToAppear(element){
      var until = protractor.ExpectedConditions;
      browser.wait(until.presenceOf(element), 7000, 'Element taking too long to appear in the DOM');  
      } 
        waitForPageToLoad():void
        {
            browser.waitForAngular()
        }
        
        mousehover(element):void
        {
            browser.actions().mouseMove(element).perform()
        }; 
         
        verifyPageHeader(element ,pageHeader:String):void {
            let headerName;
      var EC = protractor.ExpectedConditions;
             browser.wait(EC.visibilityOf(element), 17000);
             element.isPresent().then((present) => {
                 if(present) {
                     element.getText().then((msg) => {
                         console.log("before splitting text is"+msg)
                      let header =msg.split('(');
                       headerName=header[0].toString().trim();
                       console.log("txt is "+headerName)
                    expect(headerName).toEqual(pageHeader); 

                
                   });
                     
                  }
                 
                });
             
               }    
        
        
        
        getTextAndcompare(element ,expctedText:String):void {
            var EC = protractor.ExpectedConditions;
             browser.wait(EC.visibilityOf(element), 17000);
             element.isPresent().then((present) => {
                 if(present) {
                     element.getText().then((msg) => {
                       let innerTxt =msg.toString().trim();
                       console.log("text is"+innerTxt)
                       expect(expctedText).toEqual(innerTxt); 
                       
                
                   });
                     
                  }
                 
                });
             
               }   
}