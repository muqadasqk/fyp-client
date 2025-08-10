const StatCard = ({ label, count, icon: Icon }) => {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-primary border border-primary hover:shadow-md transition-all duration-300">
            <div>
                <p className="text-sm font-medium text-secondary truncate">{label}</p>
                <h2 className="text-2xl font-bold text-primary">{count}</h2>
            </div>
            <div className="p-3 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                <Icon size={28} />
            </div>
        </div>
    );
};

export default StatCard;
