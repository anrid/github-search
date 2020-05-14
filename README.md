## Github Search

A simple React app that searches Github.

### Acceptance Criteria

- Display repository’s `id`, `name`, `watchers_count`.
- Sort the results by the number of _stars_.
- Have a search input that will show results (from all possible repositories) to those that have its name matches the search field.
- Think of this as a green-field project with the freedom to choose whatever you feel is best, e.g. 3rd party libraries can be used if necessary.
- Feel free to use code bootstrapping tools (e.g. create-react-app) to save yourself time setting up the project.
- There is no need to focus on the UX of the page.

### Implementation Steps - Overview

1. Ensure we can get the right data via the Github API.
2. Generate a new React app using `create-react-app`.
3. Create basic component structure; layout, search field, search result, etc.
4. Call API and render result.
5. Implement search.
6. Make things "purrty".

### Implementation Details

1. Do a quick curl call to see we can get the right data:

```bash
curl -s 'https://api.github.com/search/repositories?q=ace&sort=stars&order=desc' | grep stargazers_count

# Output:
#   "stargazers_count": 21482,
#   "stargazers_count": 3568,
#   "stargazers_count": 2458,
#   "stargazers_count": 2165,
#   .. (27 more repos) ..
```

We get the search results in the correct order.

2. Generate an app using `create-react-app`:

```bash
# TypeScript FTW.
yarn create react-app --typescript github-search

cd github-search

# Boldly upgrade to latest everything (only the brave):
yarn upgrade-interactive --latest

# A must-have:
yarn add styled-components @types/styled-components
```

3. Next.

### Run

```bash
yarn start
```
