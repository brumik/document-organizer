# document-organizer
A desktop electron app to help you stay on top of your documents

## TODO
Follow the list:
* [ ] Revise no project documents -> let it be empty string and handle it in the backend
  * Update the dashboard redirect if we are allowing empty projects
* [ ] Check the `catch` blocks in the backed what they can return and replace them with string
* [ ] Add new project from project show page should set the project selection to the opened project
* [ ] Bug: On opening the folder/file a notification blinks shortly

Todos for later:
* [ ] Optimize reloadAll() function to ask for specific parts of DB.
* [ ] App update distribution, we don't want to download all the time a new exe, right?
* [ ] Slugs => allow for edit or add a subfix for cases where the Title is the same but the user wants to save it still (maybe different folder)
* [ ] Global search bar (just text probably)
* [ ] Allow bookmarking page with exact search
* [ ] Look into notifications
  * Set alert(s)
  * Background task for system notifications
* [ ] FEATURE: Add payment information to docs
  * Calculate to montly/yearly payment
  * New payments page, etc... all 9 yards

Docs/distribution setup:
* [x] repo, private, name?
* [ ] versioning possibilities?
* [ ] Publishing: Create snap in GH CI
* [ ] move the remaining task after initial setup to GH issues, follow some commit convention
* [ ] Lets version it with scematic release
  * [ ] Set up the initial scematic release and test it on seomthing easy
* [x] Reasearch how to publish it in any other form
  * Linux pacakges can be built on linux only - AppImage (preferred as it has auto update), debian, zip, ?snap?
  * Windows pacakges can be generated only on windows, at least the squirell ones, we should trie to use the `electron-builder` maybe to generate NSIS installer
  * MacOS (DMG)
  * Github actions can run on windows too, so theoretically we can build and publish it from there, in one action for linux, in other for windows
    * The workflow can publish to github artifacts, which could be a debian pacakge, zip or exe files. This could be done without signing anything
  * On long run we need to buy singning certificate and use that one to publish the packages.
  * Electron has auto update for: AppImage on linux, DMG, NSIS (Windows)
    * Needs: signed app fro MacOs