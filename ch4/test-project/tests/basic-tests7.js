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
        .click('[value="Submit"]')
        .expect(Selector('#flash_notice').innerText).eql('Your account has been activated. You can now log in.');
});

test('Log in', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .expect(Selector('#loggedas').exists).ok();
});

test('Log out', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .click('.logout')
        .expect(Selector('#loggedas').exists).notOk()
        .expect(Selector('.login').exists).ok();
});
