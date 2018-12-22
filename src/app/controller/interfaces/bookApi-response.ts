export interface BookApiResponse {
  items: [{
    volumeInfo: {
      imageLinks: {
        thumbnail: string;
      }
    }
  }];
}



