export const DISHES_LOADING = "DISHES_LOADING";
export const ADD_DISHES = "ADD_DISHES";
export const DISHES_FAILED = "DISHES_FAILED";
export const ADD_COMMENTS = "ADD_COMMENTS";
export const COMMENTS_FAILED = "COMMENTS_FAILED";
export const PROMOS_LOADING = "PROMOS_LOADING";
export const ADD_PROMOS = "ADD_PROMOS";
export const PROMOS_FAILED = "PROMOS_FAILED";
export const LEADERS_LOADING = "LEADERS_LOADING";
export const ADD_LEADERS = "ADD_LEADERS";
export const LEADERS_FAILED = "LEADERS_FAILED";
export const POST_FAVORITE = "POST_FAVORITE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const ADD_COMMENT = "ADD_COMMENT";
//I separate the POST_FAVORITE from the other action called Add_Favorite.
// The reason is that the Post_Favorite should be an action which would actually push the favorite to the server and would update the favorites on the server side,
// and then when the server gets updated the server needs to reply back to you saying the favorite is properly updated.
//  And then that happens you will update your local store.
// Now, in this course we don't have the support on the server side for maintaining our favorites, so I am not going to do that part,
// but I will set up the structure in place now then we do the Node JS course, then we will set up our server to be able to track favorites from each user.
// because there, we will look at authenticating users and so on, so at that point, we will be able to post the favorites for a user directly to the server,
// and when the server gets updated, then you will update your local Redux store to reflect the change in the favorites on the server side.
// And, in this case, in this exercise I'm only going to update the Redux store directly,
// but I will go through the two step process.
// First, I will Post_Favorites, and that will trigger the Redux thunk.
// And then which in turn will post a favorites into my Redux tool using the ADD_FAVORITE action.
