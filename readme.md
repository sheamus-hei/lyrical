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
| Poems| | List of FK |

### 2. Poem (1 user: Many Poems)
| Column | Type | Other |
|--------|------|-------|
| Id | Integer | PK |
| Title | String | Required |
| Lyrics | List of FK | 
| Public | Boolean | 

### 3. Lyric (1: Poem: Many Lyrics)
| Column | Type | Other |
|--------|------|-------|
| Id | Integer | PK |
| SongID | Integer | Song ID for Genius API
| ArtistID | Integer | Artist ID for Genius API |
| AnnotationID | Integer | Annotation ID for Genius API |
| Content | String 
| PoemID| FK | 



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
|POST| /poems/:id/lyrics | Add a new lyric |
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

## Diary

### Friday
* Planned schemas
* Planned front and back end routes
* Established initial file structure
 
### TO DO:

* Make initial file structure: front end
* Make initial files structure: back end
* import Mern Auth to front end
