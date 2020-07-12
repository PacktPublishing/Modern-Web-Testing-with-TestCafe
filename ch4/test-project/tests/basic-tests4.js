const { Selector } = require('testcafe');
const { stamp } = require('js-automation-tools');

const randomDigits = stamp.getTimestamp();

fixture('Redmine log in tests')
    .page('http://demo.redmine.org/');

test('Create a new user', async (t) => {
    await t.click('.register')
        .typeText('#user_login', `test_user_testcafe_poc${randomDigits}@sharklasers.com`)
        .typeText('#user_password', 'test_user_testcafe_poc')
        .typeText('#user_password_confirmation', 'test_user_testcafe_poc')
        .typeText('#user_firstname', 'test_user')
        .typeText('#user_lastname', 'testcafe_poc')
        .typeText('#user_mail', `test_user_testcafe_poc${randomDigits}@sharklasers.com`)
        .click('[value="Submit"]');
});
