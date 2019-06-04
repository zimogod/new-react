export const ADD = 'ADD';
export const REDUCE = 'REDUCE';

export let add = (num) =>({
    type:ADD,
    num
})

export let reduce = (num) =>({
    type:REDUCE,
    num
})

export const reducerNumAsync = (num) =>{
    // dispatch是派发方法，分配的意思
	return dispatch=>{
		setTimeout(() => {
		  dispatch(reduce(num))
		}, 1000)
	}
}

// export let jian = (num) =>({
//     setTimeout(() => {
        
//     }, 15000);
// })

// action creator 