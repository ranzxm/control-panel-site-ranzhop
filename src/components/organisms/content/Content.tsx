const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-auto w-[70%] min-h-screen h-screen p-4 overflow-auto box-border">
      {children}
    </div>
  );
};

export default Content;
