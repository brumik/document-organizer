# document-organizer
A desktop electron app to help you stay on top of your documents

## TODO
Follow the list:
* [ ] BUG: On startup it cannot find some documents on the disk

Todos for later:
* [ ] Allow bookmarking page with exact search
* [x] Bug: Undeinfed project showing up with files without project
* [ ] Revise no project documents -> let it be empty string and handle it in the backend
  * Update the dashboard redirect if we are allowing empty projects
* [ ] Revise how to delete projects (do I want to delete the files too or make the documents parentless)
* [ ] Revise how to archive documents (active project archived documet -> project not in archive, inside project folder an archive folder where the document would be)
* [ ] Add empty states to the pages when there is no item.
* [ ] Remove the add new fields from the starred and archived pages
* [ ] Search bar for tags, names and all
* [ ] Slugs => allow for edit or add a subfix for cases where the Title is the same but the user wants to save it still (maybe different folder)
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
