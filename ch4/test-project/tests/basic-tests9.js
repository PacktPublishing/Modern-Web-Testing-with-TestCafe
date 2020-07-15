const { Selector, ClientFunction } = require('testcafe');
const { stamp } = require('js-automation-tools');

const randomDigits = stamp.getTimestamp();

const getPageUrl = ClientFunction(() => {
        return window.location.href;
});

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

fixture('Redmine entities creation tests')
    .page('http://demo.redmine.org/');

test('Create a new project', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits}`)
        .click('[value="Create"]')
        .expect(Selector('#flash_notice').innerText).eql('Successful creation.')
        .expect(getPageUrl()).contains(`/projects/test_project${randomDigits}/settings`);
});

test('Create a new issue', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits}`)
        .typeText('#issue_description', `Test issue description ${randomDigits}`)
        .click('#issue_priority_id')
        .click('#issue_priority_id option[value="5"]')
        .click('[value="Create"]')
        .expect(Selector('#flash_notice').innerText).contains('created.')
});
