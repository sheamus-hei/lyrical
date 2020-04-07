# P4: Genius Poetry Corner

## Tech Stack
**Front end:** React

**Back end:** Python/sqlalchemy

**APIs:** Genius API ([link](https://docs.genius.com/#/getting-started-h1))

## Models

### 1. User
| Column | Type | Other |
|--------|------|-------|
| Id | Integer | PK |
| Name | String | Required|
| Email | String | Required, Unique |
| Password | Password | Limit 8-30 char

### 2. Poem (1 user: Many Poems)
| Column | Type | Other |
|--------|------|-------|
| Id | Integer | PK |
| Title | String | Required |
| Public | Boolean | 
| UserID | Integer | FK

### 3. Lyric (1: Poem: Many Lyrics)
| Column | Type | Other |
|--------|------|-------|
| Id | Integer | PK |
| Song | String | 
| Artist | String | 
| Thumbnail | String |
| Content | String |
| Order | Integer |
| PoemID| Integer | FK



## Routes

### Back End (Flask)

| Type | Address | Description|
|------|---------|------------|
|GET| /profile | Send user data |
|PUT| /profile | Update user data |
|GET| /poems | Get all poems|
|POST| /poems | Post a poem |
|GET| /poems/:id | Send poem info |
|PUT| /poems/:id | Edit poem |
|DELETE | /poems/:id | Delete poem |
|POST| /poems/:id | Add a new lyric |
|DELETE| /poems/:id/lyrics/:id | Delete a lyric |
|POST| /auth/login | Log user in
|POST| /auth/signup | Create new user

### Front End (React Components)
| Address | Description|
|------|---------|
|/ |Homepage/show all public poems| 
|/profile| Profile page |
|/profile/edit| Form to edit profile 
|/results| Results page with a list of songs | 
|/results/:id | Page for one song 
|/poems/new| Form to make a new poem 
|/poems/:id| Page to show a poem 
|/auth/login| Form to login | 
|/auth/signup| Form to sign up | 

## Tech

### Genius API
1. Using User Query from searchbar, query Genius API to show a list of songs in /results
2. Each song result will have a generic http path to the lyrics page. Pass this path to the backend.
3. Backend uses python data scraping to get the lyrics and return them to the front end page, /results/:id
4. Front End renders song lyrics from back end, with artist and title

## Diary

### Friday
* Planned schemas
* Planned front and back end routes
* Established initial file structure 
* Stubs for routes in front and back end

### Sat/Sun
* Built functioning React routes with page stubs
* Researched OAuth with Genius API and React

### Monday
* Generated Auth Token to get song results from api
* Finished /results page that shows song results from Genius api based on the user query
* Successfully tested data scraping in python to get lyrics from Genius

### Tuesday
* Successfully displaying lyrics on the React front end
 
### TO DO:

* write backend models & routes
* implement auth back end
* import Mern Auth to front end
* display poems, profile on front end
