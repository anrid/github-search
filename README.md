## Github Search

A simple React app that searches Github.

## Demo App

https://github-search-pi.now.sh/

## Run

```bash
yarn start
```

## Deploy

```bash
# Deploy using Vercel / Zeit (https://vercel.com/)
now
```

## Acceptance Criteria

- Display repository’s `id`, `name`, `watchers_count`.
- Sort the results by the number of _stars_.
- Have a search input that will show results (from all possible repositories) to those that have its name matches the search field.
- Any 3rd-party libraries can be used if necessary.
- No need to focus on the UX of the page.

## Implementation Steps - Overview

1. Ensure we can get the right data via the Github API.
2. Generate a new React app using `create-react-app`.
3. Create basic component structure; We'll need a search box, search result list, spinner, etc.
4. Call API and render result (unstyled).
5. Implement search.
6. Implement pagination.
7. Make things "purrty".

## Implementation Details

1. Do a quick curl call to see we can get the right data.

   We want to make sure we get the search results in the correct order.

```bash
curl -s 'https://api.github.com/search/repositories?q=ace&sort=stars&order=desc' | grep stargazers_count

# Output:
#   "stargazers_count": 21482,
#   "stargazers_count": 3568,
#   "stargazers_count": 2458,
#   "stargazers_count": 2165,
#   .. (27 more repos) ..
```

2. Generate an app using `create-react-app`

```bash
# TypeScript FTW.
yarn create react-app --typescript github-search

cd github-search

# Boldly upgrade to latest everything (only the brave):
yarn upgrade-interactive --latest

# A must-have:
yarn add styled-components @types/styled-components
```

3. Create a "decent" component structure

   - `App.tsx` holds our main app.
   - `components/SearchBox.tsx` has our search input field and search button.
   - `components/GithubSearchResult.tsx` is search result list.
   - `components/SpinningOctocat.tsx` is our home-made spinner.
   - `github.ts` contains our Github API access logic, implemented entirely as a reusable React effect hook.

   We use `styled-components` everywhere! :v:

4. Call API and render result (unstyled)

   We just want to make a API call, e.g. inside a React effect hook, and dump the data to the screen.

   This basically just confirms that we're wired up everything correctly.

   It's probably a good idea to save the Github search response to a local file and use the data during development to speed things up a bit, e.g. not having to perform an actual search API call everytime you reload the app.

5. Implement search.

   We'll create a separate `SearchBox` and `GithubSearchResult` components to keep things nice and orderly.

6. Implement pagination.

   Github returns a `link` HTTP header containing pagination links for most of it's API endpoints.
   We'll extract and use those in our app.

7. Make things "purrty".

   Add some bling to make our app look somewhat less crappy.
