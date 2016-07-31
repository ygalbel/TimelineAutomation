var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var file = process.argv[2];


var filename = './options' + (file ? ("_" + file) : "");
var option = require(filename);
/*
	Payment Details
*/


var accountHolders = [726405,726400,726395,726361,726354,726350,726404,726269,726156];
var bigX = 2024;
var bigY = 1200;

var smallX = 300;
var smallY = 1200;

driver.manage().window().setSize(bigX, bigX);
driver.get('http://myaccount.qa.payoneer.com');
driver.findElement(By.id('txtUserName')).sendKeys('evelin');
driver.findElement(By.id('txtPassword')).sendKeys('1234qwer!');
driver.findElement(By.id('btLogin')).click();


driver.wait(until.elementLocated(By.className('titleText')), 30000);
driver.actions().mouseMove(driver.findElement(By.xpath('//*[@id="mainmenu"]/li[1]/a'))).perform();
driver.findElement(By.xpath('//*[@id="mainmenu"]/li[1]/ul/li[3]/a')).click();

// arrive to grid page
driver.wait(until.elementLocated(By.className('time-count')), 30000);
driver.findElement(By.xpath('//*[@id="widgetContainer"]/div/div/div[3]/table/tbody/tr[1]')).click();

checkPage('start');

for(i=0;i< accountHolders.length; i++){
  id = accountHolders[i];
  url = createUrl(id);
  checkPage(id, url);
}

driver.close();


function createUrl(id){
  return 'http://myaccount.qa.payoneer.com/MainPage/Widget.aspx?w=PaymentRequestHistory#/'+id+'?_k=l7lqii';
}

function checkPage(id, url){
  driver.manage().window().setSize(bigX, bigY);
  if(url){
    console.log('go to ' , url);
    driver.get(url);
  }


  driver.sleep(1500 * 1);
  // reminders button
  if(!url){
    driver.findElement(By.xpath('//*[@id="widgetContainer"]/div/div/div[2]/div[2]/ul/li[3]/header')).click();
}

  driver.takeScreenshot().then(
      function(image, err) {
          require('fs').writeFile('c:\\temp\\'+id+'_big.png', image, 'base64', function(err) {
              console.log(err);
            });
          }
        );

        // responsive check
        driver.manage().window().setSize(smallX, smallY);
        driver.executeScript("location.reload();");
        driver.wait(until.elementLocated(By.xpath('//*[@id="widgetContainer"]/div/div/div[2]/div[2]/ul/li[3]/header')), 30000);
        driver.findElement(By.xpath('//*[@id="widgetContainer"]/div/div/div[2]/div[2]/ul/li[3]/header')).click();

        driver.sleep(1500 * 1);
        driver.takeScreenshot().then(
          function(image, err) {
            require('fs').writeFile('c:\\temp\\'+id+'_small.png', image, 'base64', function(err) {
              console.log(err);
            });
          }
        );


}
//*[@id="mainmenu"]/li[1]/ul/li[3]/a/span
/*
	Method Details
*/
//
//driver.wait(until.elementLocated(By.id('icon-payments-history')), option.timeoutMilli);
//driver.findElement(By.id('LoadTo_TransferReasonType')).sendKeys(option.LoadTo_TransferReasonType);
//driver.findElement(By.id('LoadTo_TransferReasonDescription')).sendKeys(option.LoadTo_TransferReasonDescription);
//driver.findElement(By.id('LoadTo_ServicesGoodsStatus')).sendKeys(option.LoadTo_ServicesGoodsStatus);
//driver.findElement(By.id('next')).click();

/*
    Personal Details
*/
//driver.wait(until.elementLocated(By.id('CreditCardDetails_NameOnCard')), option.timeoutMilli);
//driver.findElement(By.id('CreditCardDetails_NameOnCard')).sendKeys(option.nameOnCard);
//driver.findElement(By.id('CreditCardDetails_CCCardNumber')).sendKeys(option.cardNumber);
//driver.findElement(By.id('CreditCardDetails_CCExpMonth')).sendKeys(option.expMonth);
//driver.findElement(By.id('CreditCardDetails_CCExpYear')).sendKeys(option.expYear);
//driver.findElement(By.id('CreditCardDetails_CVV')).sendKeys(option.cvv);
//driver.findElement(By.id('next')).click();


/*
    Personal Details
*/
//driver.wait(until.elementIsVisible(driver.findElement(By.id('next'))), option.timeoutMilli);

//driver.sleep(1000 * 1);
//driver.executeScript("document.getElementsByName('next')[1].click();");

/*
    Confirmation
*/

//driver.wait(until.elementLocated(By.id('next')), option.timeoutMilli);
//driver.sleep(1000 * 1);

//driver.findElement(By.id('next')).click();



//driver.quit();
