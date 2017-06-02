/* Question:
 Finding a maintenance window amongst a list of servers that each have a list of busy times:
 server_1 busy from 00:30-03:30, 06:00-07:45, etc...
 server_2 busy from 02:00-04:00, etc...
 etc...
 Find a one hour time block that is open across all servers. Return that one hour time window, or null if no time window can be found.
*/

// Approach merging all times of servers into one list
// Using a Stack this will save help us merge intervals one by one.
// Using stack to merge time slots of servers into all busy times
// Later finding the first available time slot of 1 hour.

/*--------------------------------------------------------------*/

// Solution

//list of servers
var server1 = [[0.5, 3.5], [6, 7.75]] ;
var server2 = [[2, 4.5], [6.5, 7.5]];

//List of servers
var list_of_server_times = [server1, server2];

// Temporary list to store all times in one list
var tempServerList = [];

//Concating all list into one
for(var i=0; i<list_of_server_times.length;i++){
  tempServerList = tempServerList.concat(list_of_server_times[i]);
}


// Function to Merge Time Intervals as per Busy Times
function mergeIntervals(timeIntervals) {
  // Initial condition to check if there are at least 2 intervals
  if(timeIntervals.length <= 1)
    return timeIntervals;
  
  //using stack to store and merge time intervals
  var stack = [];
  var top   = null;

  // sort the timeIntervals based on their start values
  timeIntervals = timeIntervals.sort();

  // push the first timeInterval into the stack
  stack.push(timeIntervals[0]);

  // start from the next timeIntervals and merge if needed
  for (var i = 1; i < timeIntervals.length; i++) {
    // get the top element
    top = stack[stack.length - 1];

    // if the current timeIntervals doesn't overlap with the 
    // stack top element, push it to the stack
    if (top[1] < timeIntervals[i][0]) {
      stack.push(timeIntervals[i]);
    }
    // update the end value of the top element
    // if end of current timeIntervals is higher
    else if (top[1] < timeIntervals[i][1])
    {
      top[1] = timeIntervals[i][1];
      stack.pop();
      stack.push(top);
    }
  }
  return stack;
}

// Finding the first time slot free for all servers for one hour
function findOneHourTimeSlot(mergedIntervals){
  
  //Comparing each time slot with the one after it for difference > 1 hour
  for(var temp = 0; temp<(mergedIntervals.length-1);temp++){
    var nextTimeSlot = temp + 1;
    if( (mergedIntervals[nextTimeSlot][0] - mergedIntervals[temp][1]) > 1 ){
      console.log("First One hour time slot found between : " + mergedIntervals[temp][1] + " and :" + mergedIntervals[nextTimeSlot][0]);
    }
  }
}


//Function call for merging intervals
var mergedIntervals = mergeIntervals(tempServerList);

//Function call for free time slot
findOneHourTimeSlot(mergedIntervals);
