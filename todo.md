The main purpose is to sort bugs manually with bubble-sort by various aspects.

I'd like to copy a list of bugs from somewhere, press ctrl+V and see the list divided by rows.
Then I can add several columns, each column would represent an aspect like severity, difficulty, number of users affected, etc. Initially, those columns will contain numbers in ASC order one-by-one.
Then I select one of those columns, say, Difficulty and then I can change the order of the bugs in the rows by drag-n-dropping rows. Each time I'll be comparing two bugs together and answer the questions with of those two is more difficult to fix.

So, I'll sort them out according to the difficulty, and then I select another column, say Impact and sort the bugs according to their Impact
Then I'll copy that to Excel, and add some absolute weight to those numbers, i.e. instead of two bugs with Difficulty {1, 2} it'll be {1, 100} if the second one is significantly more difficult. Then again in excel I may use a formula to calculate the final priority.

Features left:
    add many rows with Ctrl+V inserting a text with \n's
    add a new column
    drag-n-drop
    add a row

Tech debt
    check performance on 100 of rows. If it is bad, switch to immutables and query
    e2e tests
    extract UI Row component, and table header component
