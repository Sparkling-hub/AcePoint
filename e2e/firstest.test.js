describe('Example', () => {
    beforeAll(async () => {
        await device.launchApp(); //Launch The app befory any test 
    }); 
    beforeEach(async () => {
        await device.launchApp({ newInstance: true });  //Make sure before each test is a new instance "await device.reloadReactNative();" wo;; fucntion at hot reload, is quicker but prone to bugs
    });
  
    it('Pressing login button', async () => {
        await element(by.text('Log In')).tap(); //Action
        await expect(element(by.text('The button has been pressed'))).toBeVisible(); //Assertion
    });
    
  });