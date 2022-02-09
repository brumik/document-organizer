# document-organizer
A desktop electron app to help you stay on top of your documents

## TODO
Follow the list:
* [ ] UI: Update the Project form: remove the linked documents section
* [ ] UI: dashboard documents redirect to a filtered page with the card or other solution since there is no more document show page
* [ ] UI: Make page titles POP, big and stuff
* [ ] UI: Update the descriptions in the page titles
* [ ] UI: Add the toolbar
  * Toolbar where you can:
    * Filter by tags, description, title
    * isArchived, isStarred maybe as a side checkboxes/switches
  * Allow bookmarking page with exact search
  * It means the search should be in the URL
* [ ] UI: Remove different starred and archived pages as it is doable form the toolbar

Todos for later:
* [x] Bug: Undeinfed project showing up with files without project
* [ ] Revise no project documents -> let it be empty string and handle it in the backend
* [ ] Revise how to delete projects (do I want to delete the files too or make the documents parentless)
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
