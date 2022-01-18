# document-organizer
A desktop electron app to help you stay on top of your documents

## TODO
Follow the list:
* [ ] Bug: Undeinfed project showing up with files without project
* [ ] star docs/projects
 * [x] Add stars to the db
 * [ ] Add star button to the list
 * [ ] Add star button to the show page
 * [ ] Add "Starred" subpage to projects and docs
* [ ] Expiration dates
  * Add expiration date to document/project
  * Show soon expiring documents on the main page

Todos for later:
* [ ] Search bar for tags, names and all
  * Allow bookmarking page with exact search
  * It means the search should be in the URL
* [ ] Slugs => allow for edit or add a subfix for cases where the Title is the same but the user wants to save it still (maybe different folder)
* [ ] Project form => add documents from this screen too
  * Save project -> open show scree, button here to "Add documents"
* [ ] Do something with the checkboxes on the project list page
* [ ] Revise how to delete projects (do I want to delete the files too or make the documents parentless)
* [ ] Dashboard for the App
* [ ] Optimize reloadAll() function to ask for specific parts of DB.
* [ ] Check the `catch` blocks in the backed what they can return and replace them with string
* [ ] App update distribution, we don't want to download all the time a new exe, right?
* [ ] Look into notifications
  * Set alert(s)
  * Background task for system notifications
* [ ] FEATURE: Add payment information to docs
  * Calculate to montly/yearly payment
  * New payments page, etc... all 9 yards

Docs/distribution setup:
* [x] repo, private, name?
* [ ] versioning possibilities?
* [ ] move the remaining task after initial setup to GH issues, follow some commit convention
