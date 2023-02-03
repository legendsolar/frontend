# Components

This is the Legends UI component library. It's a little disorganized as some of the components were written in an older style.

Most components export themselves as a named and a default export, although just export as a name. 

Most components have little to no functionality self contained for easy UI testing. However, some of the newer components have `Default<ComponentName>` to denote built in functionality. This is because I originally wanted components to have as few outside dependancies as possible. However, this became onerous as each component's state and associated handlers had to effectively bubble up all the way to the page level.

Thus, I started using `Default` components that have some default funtionality utilizing associated custom `hooks`.