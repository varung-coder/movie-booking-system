const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div
        className={`${sizes[size]} rounded-full border-white/10 border-t-primary animate-spin`}
      />
      {text && <p className="text-white/50 text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
