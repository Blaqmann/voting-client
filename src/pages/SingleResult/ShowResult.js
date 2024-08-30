/**
 * @prettier
 */
const ShowResult = ({ candidate, isDraw, id }) => {
   return (
      <div className='flex justify-start mt-5 mx-5 mb-3'>
         <div
            className={`flex filter flex-col lg:flex-row rounded-lg  ${
               id === 0 && !isDraw && candidate.votes > 0
                  ? 'bg-winner drop-shadow-3xl shadow-card'
                  : 'bg-gray-200 drop-shadow-md shadow-xl'
            } ${id === 0 && isDraw && 'bg-indigo-200 drop-shadow-xl shadow-xl'}`}
            style={{ width: '300px', height: '200px' }} // Set fixed width and height
         >
            <div className='my-auto mx-auto items-center justify-center pl-2'>
               <img
                  className='mt-3 max-w-lg lg:h-20 lg:w-20 md:h-16 md:w-16 w-32 h-32 rounded-full object-cover'
                  src={`${candidate.url}`}
               />
               <h5 className='text-gray-900 lg:text-lg md:text-md text-center font-medium mb-2'>
                  {candidate.name}
               </h5>
            </div>

            <div className='py-4 px-2 flex flex-col justify-start md:max-w-l lg:max-w-md'>
               <p className='text-gray-700 mb-4 text-sm overflow-hidden overflow-ellipsis'>
                  {candidate.description || 'No description available.'}
               </p>
               <div className='inline-flex'>
                  <p
                     className={`${!isDraw && id === 0 && 'text-indigo-700'} ${
                        isDraw && id === 0 && 'text-indigo-900'
                     } ${id !== 0 && 'text-black'} text-lg bold`}
                  >
                     Votes: {candidate.votes}
                  </p>
                  {id === 0 && !isDraw && candidate.votes > 0 && (
                     <p className='flex text-indigo-700 text-lg bold ml-auto pr-4'>Winner</p>
                  )}
                  {id === 0 && isDraw && (
                     <p className='flex text-indigo-900 text-lg bold ml-auto pr-4'>Draw</p>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ShowResult;
