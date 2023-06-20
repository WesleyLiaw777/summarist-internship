import ContentLayout from "@/components/ContentLayout";
export default function Settings() {
  return (
    <ContentLayout>
      <span className="mb-3 border-b-[1px] border-[#e1e7ea] pb-4 text-[32px] font-bold text-[#032b41]">
        Settings
      </span>
      <div className="mb-3 border-b-[1px] border-[#e1e7ea] pb-4">
        <span className="text-[18px] font-bold text-[#032b41] ">
          Your Subscription Plan
        </span>
        <h4 className="text-[#032b41]">premium-plus</h4>
      </div>
      <div>
        <h3 className="text-[18px] font-bold text-[#032b41]">Email</h3>
        <h4 className="text-[#032b41]">hanna@gmail.com</h4>
      </div>
    </ContentLayout>
  );
}
