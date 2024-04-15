## When to choose reducer over context?

### Lesson 1
The reducer just like the state, it is useful for us to store a information, just as we are using the useState.

Normally we are going to prefer using the reducer when dealing with more complex information, especially in the times
we need to update these informations, so let's use the cycles array for example

Many times when we are going to update these cycles, normally it's a "costly proccess", for example, when we have to
interrupt a cycle:

We need to setCycles, get the actual state of cycles, run through all of them to find the current state, if it is, we make
an update... So basically when we notice that the updates that we make on a state depends on the previous state, and we need
to make a lot of verifying, that's one case where we should look for creating a reducer, because it is going to be able
to abstract some of the code, make it simpler, make it easier to work with, and uncouple some of the logic, that it may,
in the future, be used on more parts of the code, inside one single place.
It means that if we have to interrupt a cycle of an user, if we had it this way, we would have to utilize the same code
in other parts of the application. So, by doing this, is like we have one single place inside our application to handle
all updates that can happen inside a state in our component

### Reducers Lesson 2

One of the coolest things of reducers, is that in many times, inside our application, we will see things like, before
starting the reducer on cycles, we were always updating the cycles state and then we were also updating the activeCycleId.

When we were interrupting a cycle we updated the cycles and changed the active cycle id, so we were doing two changes on
the state, one after the other one

So we had to do two state changes, one after the other, sometimes we also even had to update three states, the cycles, the
activeCycleId and secondsAmountPassed, that is, there were correlated states, and we had to change them at the same time,
so we need to call different functions and so on.

Now, with reducers, we don't have that requirement of saving inside the reducer only one information, only the list cycles,
in this example, we can save many informations inside of it.

So if on the cycles reducer state, i have an interface which has the cycles and the cyclesId, in the same state, so both
of them are going to be controlled for the same state, which is the reducer, i don't have to have many states inside my
component to control the value of many different things, if all of them belong to the same "subject"



