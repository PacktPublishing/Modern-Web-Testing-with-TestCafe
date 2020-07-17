const { Selector, ClientFunction } = require('testcafe');
const { stamp } = require('js-automation-tools');

const randomDigits1 = stamp.getTimestamp();
const randomDigits2 = stamp.resetTimestamp();
const randomDigits3 = stamp.resetTimestamp();
const randomDigits4 = stamp.resetTimestamp();

const getPageUrl = ClientFunction(() => {
        return window.location.href;
});

fixture('Redmine log in tests')
    .page('http://demo.redmine.org/');

test('Create a new user', async (t) => {
    await t.click('.register')
        .typeText('#user_login', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .typeText('#user_password', 'test_user_testcafe_poc')
        .typeText('#user_password_confirmation', 'test_user_testcafe_poc')
        .typeText('#user_firstname', 'test_user')
        .typeText('#user_lastname', 'testcafe_poc')
        .typeText('#user_mail', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .click('[value="Submit"]')
        .expect(Selector('#flash_notice').innerText).eql('Your account has been activated. You can now log in.');
});

test('Log in', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .expect(Selector('#loggedas').exists).ok();
});

test('Log out', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
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
        .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits1}`)
        .click('[value="Create"]')
        .expect(Selector('#flash_notice').innerText).eql('Successful creation.')
        .expect(getPageUrl()).contains(`/projects/test_project${randomDigits1}/settings`);
});

test('Create a new issue', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits2}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits2}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits2}`)
        .typeText('#issue_description', `Test issue description ${randomDigits2}`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('High'))
        .click('[value="Create"]')
        .expect(Selector('#flash_notice').innerText).contains('created.');
});

test('Verify that the issue is displayed on a project page', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits3}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits3}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits3}`)
        .typeText('#issue_description', `Test issue description ${randomDigits3}`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('High'))
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits3}"]`)
        .click('#main-menu .issues')
        .expect(Selector('.subject a').innerText).contains(`Test issue ${randomDigits3}`);
});

fixture('Redmine entities editing tests')
    .page('http://demo.redmine.org/');

test('Edit the issue', async (t) => {
    await t.click('.login')
        .typeText('#username', `test_user_testcafe_poc${randomDigits1}@sharklasers.com`)
        .typeText('#password', 'test_user_testcafe_poc')
        .click('[name="login"]')
        .click('#top-menu .projects')
        .click('.icon-add')
        .typeText('#project_name', `test_project${randomDigits4}`)
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits4}"]`)
        .click('.new-issue')
        .typeText('#issue_subject', `Test issue ${randomDigits4}`)
        .typeText('#issue_description', `Test issue description ${randomDigits4}`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('High'))
        .click('[value="Create"]')
        .click('#top-menu .projects')
        .click(`[href*="/projects/test_project${randomDigits4}"]`)
        .click('#main-menu .issues')
        .click(Selector('.subject a').withText(`Test issue ${randomDigits4}`))
        .click('.icon-edit')
        .selectText('#issue_subject')
        .pressKey('delete')
        .typeText('#issue_subject', `Issue ${randomDigits4} updated`)
        .click('#issue_priority_id')
        .click(Selector('#issue_priority_id option').withText('Normal'))
        .click('[value="Submit"]')
        .expect(Selector('#flash_notice').innerText).eql('Successful update.');
});
