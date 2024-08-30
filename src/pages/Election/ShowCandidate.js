/**
 * @prettier
 */
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import Electioneth from '../../ethereum/election';
import axios from 'axios';
import web3 from '../../ethereum/web3';
import { useNavigate } from 'react-router';
// eslint-disable-next-line
import { Link } from 'react-router-dom';

const ShowCandidate = ({ id, candidate, candidateCount, setLoading }) => {
   // eslint-disable-next-line
   const { user, validAccount, notify, election, setUser } = useContext(AuthContext);
   const [vote, setVote] = useState(+candidate.votes);
   // eslint-disable-next-line
   const navigate = useNavigate();
   useEffect(() => {
      const b = async () => {
         const Election = Electioneth(election);
         let newCandidate = await Election.methods.candidates(id).call();
         let candidateVote = newCandidate.votes;
         setVote(candidateVote);
      };
      b();
      return () => b;
   });
   const voteHandler = async (e) => {
      e.preventDefault();
      setLoading(true);

      const account = await web3.eth.getAccounts();
      if (account[0] !== user.eAddress) {
         notify('You are using wrong ethereum account', 'error');
         setLoading(false);
         return;
      }
      //voting the candidate and retrieving latest candidate vote count
      try {
         const Election = Electioneth(election);
         const accounts = await web3.eth.getAccounts();
         await Election.methods.voteCandidate(id).send({
            from: accounts[0],
         });
         setVote((prevVote) => prevVote + 1);
         notify('You have successfully voted a candidate', 'success');
      } catch (err) {
         notify(err.message, 'error');
         setLoading(false);
         return;
      }
      try {
         //send a put request
         const response = await axios.put(
            '/election/vote',
            {},
            {
               withCredentials: true,
            }
         );
         setUser(response.data.user);
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
         setLoading(false);
         return;
      }

      console.log(vote);

      setLoading(false);
      // navigate('/election')
   };
   return (
      <>
         <div className='flex justify-start mt-5 mx-5'>
            <div
               className='flex filter drop-shadow-xl flex-col lg:flex-row rounded-lg hover:shadow-xl shadow-lg bg-gray-200'
               style={{ width: '300px', height: '200px' }} // Set fixed width and height
            >
               <div className='my-auto mx-auto items-center justify-center pl-2'>
                  <img
                     className='mt-3 lg:h-20 max-w-lg lg:w-20 md:h-16 md:w-16 w-32 h-32 rounded-full object-cover'
                     src={`${candidate.url}`}
                     alt='candidate-name'
                  />
                  <h5 className='text-gray-900 lg:text-lg md:text-md text-center font-medium mb-2'>
                     {candidate.name}
                  </h5>
               </div>

               <div className='py-4 px-2 flex flex-col justify-start md:max-w-l lg:max-w-md'>
                  <p className='text-gray-700 mb-4 text-sm overflow-hidden overflow-ellipsis'>
                     {candidate.description}
                  </p>
                  {user && user.electionOngoing && !user.hasVoted && (
                     <button
                        onClick={voteHandler}
                        className='mx-auto relative w-3/4 rounded-lg border border-transparent py-2 mt-5 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400'
                     >
                        Vote
                     </button>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default ShowCandidate;
