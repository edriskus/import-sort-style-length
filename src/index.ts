import { INamedMemberSorterFunction, ISorterFunction, IStyleAPI, IStyleItem } from "import-sort-style";

const length: ISorterFunction = (i1, i2) => {
  let i1length = i1.end - i1.start;
  if (i1length > 80 && i1.namedMembers.length > 0) {
    i1length = i1.moduleName.length + 10;
  }
  let i2length = i2.end - i2.start
  if (i2length > 80 && i2.namedMembers.length > 0) {
    i2length = i2.moduleName.length + 10;
  }
  const diff = i1length - i2length;
  return diff / Math.abs(diff);
};

const memberLength: INamedMemberSorterFunction = (n1, n2) => {
  const diff = n1.name.length - n2.name.length;
  return diff / Math.abs(diff);
};

export default function(styleApi: IStyleAPI): IStyleItem[] {
  const {
    and,
    hasNoMember,
    hasOnlyDefaultMember,
    hasOnlyNamedMembers,
    hasOnlyNamespaceMember,
  } = styleApi;

  return [
    // import "foo"
    {
      match: and(hasNoMember),
      sort: length,
    },
    {separator: true},

    // import Foo from "bar";
    {
      match: and(hasOnlyDefaultMember),
      sort: length,
    },
    {separator: true},
  
    // import {_, bar, …} from "baz";
    {
      match: and(hasOnlyNamedMembers),
      sort: length,
      sortNamedMembers: memberLength,
    },
    {separator: true},

    // import * as _ from "bar";
    {
      match: and(hasOnlyNamespaceMember),
      sort: length,
    },
    {separator: true},
  ];
}
