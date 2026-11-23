import matter from "gray-matter";
import yaml from "js-yaml";

const matterOptions = {
  engines: {
    yaml: (str: string) => yaml.load(str) as object,
  },
};

export function parseFrontmatter<T = Record<string, any>>(raw: string): {
  data: T;
  content: string;
} {
  return matter(raw, matterOptions) as unknown as { data: T; content: string };
}
