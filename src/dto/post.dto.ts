import { SiteDto } from "./site.dto";

export class PostDto{
  site: SiteDto;
  title: string;
  content: string;
  views: number;
  scrapCount: number;
}