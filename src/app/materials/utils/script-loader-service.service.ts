import { Injectable ,Renderer2, RendererFactory2} from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderServiceService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  loadScript(src: string): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => {
        observer.next();
        observer.complete();
      };
      script.onerror = (error: any) => {
        observer.error(error);
      };
      this.renderer.appendChild(document.body, script);
    });
  }
}
