import { Redirect } from "@/components";
import { UrlModel } from "@/models";
import { connectDB } from "@/utils";
import { redirect } from "next/navigation";

type ShortUrlPageParams = {
    params: {
      shortUrl: string;
    };
  };
  
  type ShortUrlPageResult = JSX.Element | { redirect: string };
  
  const shortUrl = async ({
    params,
  }: ShortUrlPageParams): Promise<ShortUrlPageResult> => {
    try {
      connectDB();
  
      const data = await UrlModel.findOne({ short: params.shortUrl });
  
      if (!data) return redirect('/');
  
      return <Redirect path={data.original} />;
    } catch (error) {
      console.log(error);
      return redirect('/');
    }
  };
  
  export default shortUrl;