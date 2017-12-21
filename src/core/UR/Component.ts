export namespace UR {
  export type Constructor<T> = new (...args: any[]) => T

  export abstract class URComponent {
    private static methods: any
    x: number
    y: number
    width: number
    height: number
    // abstract callMe(): void
    public hello(): void {
      // nothing here
    }
  }

  export function Component<C extends Constructor<any>>(ctor: C) : Constructor<URComponent> & C {
    abstract class URComponentClass extends ctor {
      private static methods: any = {
        hello: URComponentClass.prototype.hello
      }

      x: number = 0
      y: number = 0
      width: number = 1
      height: number = 1

      // abstract callMe(): void

      public hello(): void {
        console.log('Sample hello world')
        // this.callMe()
      }
    }

    return URComponentClass
  }
}
