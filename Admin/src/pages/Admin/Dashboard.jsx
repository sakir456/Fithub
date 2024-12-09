const Dashboard = () => {
  return (
    <div className="m-5">
      <div className="flex flex-wrap items-center gap-3 ">
        <div className="flex items-center gap-2 bg-white  p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-12 " src="/src/assets/personalTrainer.png" alt="Trainer img"/>
          <div>
            <p className="text-xl font-semibold text-gray-600">6</p>
            <p className="text-gray-400" >Trainers</p>
          </div> 
        </div>
        <div className="flex items-center gap-2 bg-white  p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-12 " src="/src/assets/members.png" alt="Trainer img"/>
          <div>
            <p className="text-xl font-semibold text-gray-600">10</p>
            <p className="text-gray-400" >Members</p>
          </div>
        </div>
        <div className="flex items-center gap-2  bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-12 " src="/src/assets/classList.png" alt="Trainer img"/>
          <div>
            <p className="text-xl font-semibold text-gray-600">7</p>
            <p className="text-gray-400">Upcoming Classes</p>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Dashboard