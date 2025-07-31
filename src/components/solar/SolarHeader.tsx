export const SolarHeader = () => {
  return (
    <div className="text-center mb-4">
      <div className="flex items-center justify-center mb-2">
        <img 
          src="/lovable-uploads/9db79ece-e986-4d58-ba47-4c0ba70668df.png" 
          alt="i9 Solar" 
          className="h-8 md:h-8 w-auto"
        />
      </div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
        Descubra quanto você pode economizar com energia solar!
      </h2>
      <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
        Simule sua economia gratuitamente e descubra como a energia solar pode 
        revolucionar sua conta de luz.
      </p>
    </div>
  );
};
