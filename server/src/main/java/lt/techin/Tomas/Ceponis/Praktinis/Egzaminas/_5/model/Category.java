package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;

  @OneToMany(mappedBy = "category")
  private List<Advertisement> advertisements = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  public Category() {
  }


  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<Advertisement> getAdvertisements() {
    return advertisements;
  }

  public void setAdvertisements(List<Advertisement> advertisements) {
    this.advertisements = advertisements;
  }
}